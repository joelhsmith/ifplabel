<?php
/**
 * @file
 * Style: ifplabel.
 */

namespace Drupal\ifplabel\Plugin\Control\ifplabel;
use Drupal\openlayers\Component\Annotation\OpenlayersPlugin;
use Drupal\openlayers\Types\Style;

/**
 * Class ifplabel.
 *
 * @OpenlayersPlugin(
 *  id = "ifplabel"
 * )
 */
class ifplabel extends Style {
  /**
   * {@inheritdoc}
   */
  public function optionsForm(array &$form, array &$form_state) {
    $form['options']['default'] = array(
      '#type' => 'fieldset',
      '#title' => t('Default'),
      '#description' => 'There are no options for this static label type',
      '#collapsible' => FALSE,
    );
  }



  /**
   * {@inheritdoc}
   */
  public function optionsFormSubmit(array $form, array &$form_state) {
    parent::optionsFormSubmit($form, $form_state);

    $options = $this->getOptions();
    foreach (Openlayers::getGeometryTypes() as $geometry_type => $geometry) {
      if ((bool) $options[$geometry_type]['enabled'] === FALSE) {
        unset($options[$geometry_type]);
      }
    }

    $this->setOptions($options);
    $form_state['values']['options'] = $options;
    parent::optionsFormSubmit($form, $form_state);
  }

}
